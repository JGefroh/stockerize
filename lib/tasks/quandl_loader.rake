require 'csv'
namespace :quandl_loader do
  desc "Load full quandle CSV into the database."
  task full_load: [:environment] do
    csv_path = ARGV[1]
    CSV.foreach(csv_path, headers: true) do |row|
      s = Stock.find_or_create_by(ticker: row[0])
      sp = StockPrice.create(
            stock_id: s.id,
            ticker: row[0],
            date: row[1],
            open_price: row[2],
            high_price: row[3],
            low_price: row[4],
            close_price: row[5],
            volume: row[6]
      )
      puts sp.inspect
    end
  end
end
