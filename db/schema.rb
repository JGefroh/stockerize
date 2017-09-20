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

ActiveRecord::Schema.define(version: 20170920011641) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stock_prices", force: :cascade do |t|
    t.integer  "close_price_cents",    default: 0,     null: false
    t.string   "close_price_currency", default: "USD", null: false
    t.integer  "open_price_cents",     default: 0,     null: false
    t.string   "open_price_currency",  default: "USD", null: false
    t.integer  "low_price_cents",      default: 0,     null: false
    t.string   "low_price_currency",   default: "USD", null: false
    t.integer  "high_price_cents",     default: 0,     null: false
    t.string   "high_price_currency",  default: "USD", null: false
    t.integer  "volume",               default: 0
    t.string   "ticker"
    t.integer  "stock_id",                             null: false
    t.date     "date"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  create_table "stocks", force: :cascade do |t|
    t.string   "ticker"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
