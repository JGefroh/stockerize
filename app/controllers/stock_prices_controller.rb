class StockPricesController < ApplicationController
  def index
    @stock_prices = StockPrice.all
    if params.to_h.count == 2
      @stock_prices = @stock_prices.order(date: :desc, open_close_price_delta_cents: :desc)
    end
    @stock_prices = @stock_prices.where(stock_id: params[:stock_id]).order(date: :desc) if params[:stock_id]
    if params[:ticker]
      @stock_prices = @stock_prices.where(ticker: params[:ticker].split(',')).order(date: :desc, ticker: :asc)
    end
    @stock_prices = @stock_prices.limit(100)
    render json: @stock_prices, root: false
  end
end
