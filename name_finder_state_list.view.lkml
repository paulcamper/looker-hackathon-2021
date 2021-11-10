view: name_finder_state_list {
  derived_table: {
    sql: SELECT
          usa_1910_current.state  AS usa_1910_current_state,
          COUNT(*) AS usa_1910_current_count
      FROM `bigquery-public-data.usa_names.usa_1910_current`
           AS usa_1910_current
      GROUP BY
          1
      ORDER BY
          2 DESC
      LIMIT 500
       ;;
  }

  measure: count {
    type: count
    drill_fields: [detail*]
  }

  dimension: usa_1910_current_state {
    type: string
    sql: ${TABLE}.usa_1910_current_state ;;
  }

  dimension: usa_1910_current_count {
    type: number
    sql: ${TABLE}.usa_1910_current_count ;;
  }

  set: detail {
    fields: [usa_1910_current_state, usa_1910_current_count]
  }
}
