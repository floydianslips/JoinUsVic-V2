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

ActiveRecord::Schema.define(version: 20190308224749) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "anchors", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "funfacts", force: :cascade do |t|
    t.string "user_name", default: "@Someone@"
    t.string "description", null: false
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keywords", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keywords_locations", id: false, force: :cascade do |t|
    t.bigint "location_id", null: false
    t.bigint "keyword_id", null: false
    t.index ["keyword_id", "location_id"], name: "index_keywords_locations_on_keyword_id_and_location_id"
    t.index ["location_id", "keyword_id"], name: "index_keywords_locations_on_location_id_and_keyword_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "description", null: false
    t.string "website", default: "/"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "anchor_id"
    t.index ["anchor_id"], name: "index_locations_on_anchor_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.float "score", default: 0.0
    t.integer "location_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "funfacts", "locations"
  add_foreign_key "locations", "anchors"
  add_foreign_key "ratings", "locations"
end
