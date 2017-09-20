class StockPricesController < ApplicationController
  def index
    @stock_prices = StockPrice.all
    if params.count == 2
      @stock_prices = @stock_prices.order(date: :desc).order('close_price_cents - open_price_cents desc')
    end
    @stock_prices = @stock_prices.where(stock_id: params[:stock_id]).order(date: :desc) if params[:stock_id]
    @stock_prices = @stock_prices.where(ticker: params[:ticker]) if params[:ticker]
    @stock_prices = @stock_prices.limit(100)
    render json: @stock_prices, root: false
  end
end
