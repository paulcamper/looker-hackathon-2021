project_name: "Name Finder"

application: name-finder {
  label: "Name Finder"
  url: "http://localhost:8080/bundle.js"
  # file: "bundle.js"
  entitlements: {
    core_api_methods: ["me"]
    use_embeds: yes
    use_iframes: yes
  }
}
