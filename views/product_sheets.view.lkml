view: product_sheets {
  sql_table_name: `demo.product_sheets`
    ;;

  dimension: custom_grouping {
    type: string
    sql: ${TABLE}.Custom_Grouping ;;
  }

  dimension: product_id {
    type: number
    # hidden: yes
    sql: ${TABLE}.Product_ID ;;
  }

  dimension: product_name {
    type: string
    sql: ${TABLE}.Product_Name ;;
  }

  measure: count {
    type: count
    drill_fields: [product_name, products.item_name, products.id]
  }
}
