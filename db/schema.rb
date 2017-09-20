# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170920186000) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stock_prices", force: :cascade do |t|
    t.bigint   "close_price_cents",               default: 0,     null: false
    t.string   "close_price_currency",            default: "USD", null: false
    t.bigint   "open_price_cents",                default: 0,     null: false
    t.string   "open_price_currency",             default: "USD", null: false
    t.bigint   "low_price_cents",                 default: 0,     null: false
    t.string   "low_price_currency",              default: "USD", null: false
    t.bigint   "high_price_cents",                default: 0,     null: false
    t.string   "high_price_currency",             default: "USD", null: false
    t.bigint   "volume",                          default: 0,     null: false
    t.string   "ticker"
    t.integer  "stock_id",                                        null: false
    t.date     "date"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.bigint   "open_close_price_delta_cents",    default: 0,     null: false
    t.string   "open_close_price_delta_currency", default: "USD", null: false
    t.bigint   "low_high_price_delta_cents",      default: 0,     null: false
    t.string   "low_high_price_delta_currency",   default: "USD", null: false
    t.index ["date"], name: "index_stock_prices_on_date", using: :btree
    t.index ["low_high_price_delta_cents"], name: "index_stock_prices_on_low_high_price_delta_cents", using: :btree
    t.index ["open_close_price_delta_cents"], name: "index_stock_prices_on_open_close_price_delta_cents", using: :btree
    t.index ["ticker"], name: "index_stock_prices_on_ticker", using: :btree
  end

  create_table "stocks", force: :cascade do |t|
    t.string   "ticker"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
