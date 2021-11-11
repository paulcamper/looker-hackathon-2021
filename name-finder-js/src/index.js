import {
  connectExtensionHost,
  LookerExtensionSDK40,
} from "@looker/extension-sdk";

import React, { useEffect, useState, useContext } from 'react'
import { Space, ComponentsProvider, Text } from '@looker/components'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { ExtensionContext2 } from '@looker/extension-sdk-react'

const extensionContext = useContext(
    ExtensionContext2
  )
  const { extensionSDK } = extensionContext

const canceller = (event) => {
    return { cancel: !event.modal }
  }

const updateRunButton = (running) => {
    setRunning(running)
  }

const setupDashboard = (dashboard) => {
    setDashboard(dashboard)
  }

const embedCtrRef = useCallback(
    (el) => {
      const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
      if (el && hostUrl) {
        el.innerHTML = ""
        LookerEmbedSDK.init(hostUrl)
        const db = LookerEmbedSDK.createDashboardWithId(17)
          .withNext()
          .appendTo(el)
          .on('dashboard:loaded', updateRunButton.bind(null, false))
          .on('dashboard:run:start', updateRunButton.bind(null, true))
          .on('dashboard:run:complete', updateRunButton.bind(null, false))
          .on('drillmenu:click', canceller)
          .on('drillmodal:explore', canceller)
          .on('dashboard:tile:explore', canceller)
          .on('dashboard:tile:view', canceller)
          .build()
          .connect()
          .then(setupDashboard)
          .catch((error) => {
            console.error('Connection error', error)
          })
      }
    },
    []
  )

(async () => {
  extensionSDK.updateTitle('🐤 Name Finder')
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
