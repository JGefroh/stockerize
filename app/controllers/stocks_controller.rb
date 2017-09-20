class StocksController < ApplicationController
  def show
    @stock = Stock.find(params[:id])
    render json: @stock, root: false
  end
end
