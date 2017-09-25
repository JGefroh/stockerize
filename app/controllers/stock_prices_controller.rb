class StockPricesController < ApplicationController
  def index
    @stock_prices = StockPrice.all
    if params.to_h.count == 2
      @stock_prices = @stock_prices.order(date: :desc, open_close_price_delta_cents: :desc)
    end
    @stock_prices = @stock_prices.where(stock_id: params[:stock_id]).order(date: :desc) if params[:stock_id]
    if params[:resolution]
      params[:ticker] = @stock_prices.limit(10).pluck(:ticker).join(',') unless params[:ticker]
      result_set = execute_time_series(params)
      results = []
      result_set.rows.each {|row|
        os = {
          date: row[0],
          ticker: row[1],
          open_price_cents: row[2],
          close_price_cents: row[3],
          open_close_price_delta_cents: row[4],
          low_price_cents: row[5],
          high_price_cents: row[6],
          low_high_price_delta_cents: row[7],
          volume: row[8].to_f,
          stock_id: row[9]
        }
        results.push(os)
      }
      render json: results, root: false and return
    end
    @stock_prices = @stock_prices.limit(100)
    render json: @stock_prices, root: false
  end

  private def execute_time_series(params)
    case params[:resolution]
      when 'yearly'
        interval = 'year'
        series_interval = '1 YEAR'
      when 'quarterly'
        interval = 'quarter'
        series_interval = '3 MONTH'
      when 'monthly'
        interval = 'month'
        series_interval = '1 MONTH'
      when 'weekly'
        interval = 'week'
        series_interval = '1 WEEK'
      when 'daily'
        interval = 'day'
        series_interval = '1 DAY'
    end
    from_date = params[:from_date] || '2010-01-01'
    tickers = params[:ticker]
    safe_interval = ActiveRecord::Base.connection.quote(interval)
    safe_tickers = tickers.split(',').map{|ticker|
      ActiveRecord::Base.connection.quote(ticker)
    }.join(',')
    safe_series_interval = ActiveRecord::Base.connection.quote(series_interval)
    safe_from_date = ActiveRecord::Base.connection.quote(Date.parse(from_date))

    ActiveRecord::Base.connection.exec_query( "SELECT DATE(periods) as date, ticker, avg(stock_prices.open_price_cents), avg(stock_prices.close_price_cents), avg(stock_prices.open_close_price_delta_cents), avg(stock_prices.low_price_cents), avg(stock_prices.high_price_cents), avg(stock_prices.low_high_price_delta_cents), avg(stock_prices.volume), stock_id
       FROM GENERATE_SERIES(
            (SELECT DATE(DATE_TRUNC(#{safe_interval}, MIN(date)))
              FROM stock_prices
              WHERE date >= #{safe_from_date}
            ),
            CURRENT_DATE,
            #{safe_series_interval}::INTERVAL
       ) periods
       LEFT JOIN stock_prices
       ON DATE(DATE_TRUNC(#{safe_interval}, stock_prices.date)) = periods and ticker IN (#{safe_tickers})
       GROUP BY periods, ticker, stock_id
       ORDER BY periods DESC")
  end
end
