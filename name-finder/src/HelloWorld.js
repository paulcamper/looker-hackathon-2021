// Copyright 2021 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     https://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import styled from "styled-components";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { Space, ComponentsProvider, Span } from "@looker/components";
import { ExtensionContext } from "@looker/extension-sdk-react";
export const HelloWorld = () => {
  const extensionContext = useContext(ExtensionContext);
  const { core40SDK } = extensionContext;
  const [message, setMessage] = useState();
  const canceller = (event) => {
    return { cancel: !event.modal };
  };
  const updateRunButton = (running) => {
    setRunning(running);
  };
  const setupDashboard = (dashboard) => {
    setDashboard(dashboard);
  };
  const embedCtrRef = useCallback((el) => {
    const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl;
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl);
      const db = LookerEmbedSDK.createDashboardWithId(17)
        .withNext()
        .appendTo(el)
        .on("dashboard:loaded", updateRunButton.bind(null, false))
        .on("dashboard:run:start", updateRunButton.bind(null, true))
        .on("dashboard:run:complete", updateRunButton.bind(null, false))
        .on("drillmenu:click", canceller)
        .on("drillmodal:explore", canceller)
        .on("dashboard:tile:explore", canceller)
        .on("dashboard:tile:view", canceller)
        .build()
        .connect()
        .then(setupDashboard)
        .catch((error) => {
          console.error("Connection error", error);
        });
    }
  }, []);
  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await core40SDK.ok(core40SDK.me());
        setMessage(`Welcome to the 🐤 Name Finder, ${value.display_name} !`);
      } catch (error) {
        setMessage("Error occured getting information about me!");
        console.error(error);
      }
    };
    initialize();
  }, []);
  return (
    <>
      <ComponentsProvider>
        <Space around>
          <Span fontSize="xxxxxlarge">{message}</Span>
        </Space>
        <EmbedContainer ref={embedCtrRef} />
      </ComponentsProvider>
    </>
  );
};
export const EmbedContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;
