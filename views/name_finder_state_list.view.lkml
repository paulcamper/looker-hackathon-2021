view: name_finder_state_list {
  derived_table: {
    sql: SELECT
            names_list.state  AS state,
            names_list.gender  AS gender,
            names_list.name  AS name,
            names_list.number  AS rank_number,
            names_list.year  AS year,
        FROM `bigquery-public-data.usa_names.usa_1910_current`
             AS names_list
            ;;
  }

  measure: count {
    type: count
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }

  dimension: state_map {
    map_layer_name: us_states
    sql: ${TABLE}.state ;;
  }

  dimension: gender {
    type: string
    sql: ${TABLE}.gender ;;
  }

  dimension: name {
    type: string
    sql: ${TABLE}.name ;;
  }

  dimension: rank_number {
    type: number
    sql: ${TABLE}.rank_number ;;
  }

  dimension: year {
    type: number
    sql: ${TABLE}.year ;;
  }
}
