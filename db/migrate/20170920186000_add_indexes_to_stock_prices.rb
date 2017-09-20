class AddIndexesToStockPrices < ActiveRecord::Migration[5.0]
  def change
    add_index :stock_prices, :ticker
    add_index :stock_prices, :date
    add_index :stock_prices, :low_high_price_delta_cents
    add_index :stock_prices, :open_close_price_delta_cents
  end
end
