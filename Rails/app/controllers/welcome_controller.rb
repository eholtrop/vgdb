class WelcomeController < ApplicationController
  def index
  	require 'wikipedia'
  	page = Wikipedia.find( '2015 in video gaming')
  	@controller_message = page.categories
  end
end
