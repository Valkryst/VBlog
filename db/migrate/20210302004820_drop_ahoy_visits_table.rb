class DropAhoyVisitsTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :ahoy_events
  end
end
