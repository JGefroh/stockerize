class StockPricesController < ApplicationController
  def index
    @stock_prices = StockPrice.all.limit(100)
    @stock_prices = @stock_prices.where(stock_id: params[:stock_id]) if params[:stock_id]
    render json: @stock_prices, root: false
  end
end
