class AddCombinedIndexesToStockPrices < ActiveRecord::Migration[5.0]
  def change
    add_index :stock_prices, [:date, :open_close_price_delta_cents]
    add_index :stock_prices, [:date, :low_high_price_delta_cents]
  end
end
