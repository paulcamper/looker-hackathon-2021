import {
  connectExtensionHost,
  LookerExtensionSDK40,
} from "@looker/extension-sdk";

(async () => {
  const extensionSdk = await connectExtensionHost();
  const sdk40 = LookerExtensionSDK40.createClient(extensionSdk);
  const result = await sdk40.me();
  const name = result.ok ? result.value.display_name : "Unknown";
  document.write(`
  <style>
    body {
      font-family: -apple-system, system-ui, BlinkMacSystemFont;
      text-align:center;
      font-variant-numeric: tabular-nums;
    }
    }
    .webpage {
      padding: 100px 0;
    }
  </style>
  <div class="webpage">
    <h1>Name Finder</h1>
    <h4>Hello, ${name}! Do you want to know, how popular your first name has been in a certain year?</h4>
  </div>
`);
})();
