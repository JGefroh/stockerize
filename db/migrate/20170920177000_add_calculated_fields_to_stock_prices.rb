class AddCalculatedFieldsToStockPrices < ActiveRecord::Migration[5.0]
  def change
    add_column :stock_prices, :open_close_price_delta_cents, :integer, default: 0, null: false, limit: 8
    add_column :stock_prices, :open_close_price_delta_currency, :string, default: "USD", null: false

    add_column :stock_prices, :low_high_price_delta_cents, :integer, default: 0, null: false, limit: 8
    add_column :stock_prices, :low_high_price_delta_currency, :string, default: "USD", null: false
  end
end
