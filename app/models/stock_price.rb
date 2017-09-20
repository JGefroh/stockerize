class StockPrice < ApplicationRecord
  monetize :open_price_cents
  monetize :close_price_cents
  monetize :low_price_cents
  monetize :high_price_cents
  monetize :low_high_price_delta_cents
  monetize :open_close_price_delta_cents

  before_save :update_price_deltas

  def update_price_deltas
    self.low_high_price_delta_cents = self.high_price_cents - self.low_price_cents
    self.open_close_price_delta_cents = self.close_price_cents - self.open_price_cents
  end
end
