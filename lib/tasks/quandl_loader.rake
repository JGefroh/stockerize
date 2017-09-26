require 'csv'
namespace :quandl_loader do
  desc "Load full quandle CSV into the database."

  task full_load: [:environment] do
    csv_path = ARGV[1]
    stocks_by_ticker = {}
    stock_prices = []
    skip_ticker = nil
    last_ticker = nil
    skipped = nil
    should_skip = {}
    columns = [:stock_id, :ticker, :date, :open_price_cents, :high_price_cents, :low_price_cents, :close_price_cents, :volume, :open_close_price_delta_cents, :low_high_price_delta_cents]
    CSV.foreach(csv_path, headers: true) do |row|
      ticker = row[0]

      # Skip optimization
      next if should_skip[ticker]
      if StockPrice.where(ticker: ticker).exists?
        puts "Skipping #{ticker}"
        should_skip[ticker] = true
        next
      end
      last_ticker = ticker unless last_ticker
      unless last_ticker === ticker
        StockPrice.import(columns, stock_prices, validate: false)
        puts "Imported #{last_ticker} - #{stock_prices.count} records."
        stock_prices = []
        last_ticker = ticker
        puts "Beginning import of #{ticker}..."
      end
      stocks_by_ticker[ticker] = Stock.find_or_create_by(ticker: ticker) unless stocks_by_ticker[ticker]
      sp = StockPrice.new(
            stock_id: stocks_by_ticker[ticker].id,
            ticker: row[0],
            date: row[1],
            open_price: row[2],
            high_price: row[3],
            low_price: row[4],
            close_price: row[5],
            volume: row[6]
      )
      stock_prices << [sp.stock_id, sp.ticker, sp.date, sp.open_price_cents, sp.high_price_cents, sp.low_price_cents, sp.close_price_cents, sp.volume, sp.close_price_cents - sp.open_price_cents, sp.high_price_cents - sp.low_price_cents]
    end
    if stock_prices.count > 0
      StockPrice.import(columns, stock_prices, validate: false)
    end
  end
end
