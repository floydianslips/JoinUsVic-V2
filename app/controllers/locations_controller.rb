require 'set'

class LocationsController < ApplicationController
  before_action :set_location, only: [:show, ]

  # GET /locations
  def index
    @locations = Location.order(:id)
    render json: @locations
  end

  # GET /locations/1
  def show
    render json: @location
  end

  # GET highlighted locations and anchors based on user keyword selection
  def highlight
    filter_it = params[:filtered][:bool]
    keyword_ids = params[:keywordIds][:keys]

    keyword_to_locations_hash =
      keyword_to_locations_hash(keyword_ids)

    locations = keyword_to_locations_hash.map{ |keyword, locations| locations }

    filter_it ? (locations_array = locations.reduce(:&)) : (locations_array = locations.flatten.uniq)

    average_ratings_array = average_ratings(locations_array)

    anchors_ids_str = locations_array.map { |location| location.anchor_id }.join(',')

    render json: {
      :locations_array => locations_array,
      :average_ratings_array => average_ratings_array,
      :anchors_ids_str => anchors_ids_str
    }
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_location
    @location = Location.find(params[:id])
  end

  def keyword_to_locations_hash(keyword_ids)
    keyword_to_locations_hash = {}
    keyword_ids.each do |keyword|
      keyword_to_locations_hash[keyword] = Keyword.find(keyword).locations
    end
    keyword_to_locations_hash
  end

  def average_ratings(locations_array)
    average_ratings_array = []
    average_ratings_array = locations_array.map { |location|
      location.ratings.length > 0 ? location.ratings.average(:score).round(1) : 0.0
    }
    average_ratings_array
  end

end
