class StockPrice < ApplicationRecord
  monetize :open_price_cents
  monetize :close_price_cents
  monetize :low_price_cents
  monetize :high_price_cents
end
