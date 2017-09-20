require 'csv'
namespace :quandl_loader do
  desc "Load full quandle CSV into the database."

  task full_load: [:environment] do
    csv_path = ARGV[1]
    stocks_by_ticker = {}
    stock_prices = []
    count = 0
    skip_ticker = nil
    CSV.foreach(csv_path, headers: true) do |row|
      ticker = row[0]
      next if skip_ticker === ticker
      stock = stocks_by_ticker[ticker]
      unless stock
         puts "Starting #{ticker}"
         stock = Stock.find_or_create_by(ticker: ticker)
         if !StockPrice.where(ticker: ticker).exists?
           stocks_by_ticker[ticker] = stock
           count += stock_prices.count
           columns = [:stock_id, :ticker, :date, :open_price_cents, :high_price_cents, :low_price_cents, :close_price_cents, :volume, :open_close_price_delta_cents, :low_high_price_delta_cents]
           StockPrice.import(columns, stock_prices, validate: false)
           stock_prices = []
         else
           puts "Skipping #{ticker} - stock price records already exist..."
           skip_ticker = ticker
         end
      end
      stocks_by_ticker[ticker] = stock
      sp = StockPrice.new(
            stock_id: stock.id,
            ticker: row[0],
            date: row[1],
            open_price: row[2],
            high_price: row[3],
            low_price: row[4],
            close_price: row[5],
            volume: row[6]
      )
      stock_prices << [sp.stock_id, sp.ticker, sp.date, sp.open_price_cents, sp.high_price_cents, sp.low_price_cents, sp.close_price_cents, sp.volume, sp.high_price_cents - sp.low_price_cents, sp.close_price_cents - sp.open_price_cents]
    end
  end
end
