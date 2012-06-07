// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var alertTimeoutID;
var warningTimeoutID;

// Called when the url of a tab changes.

function checkForValidUrl(tabId, changeInfo, tab) {
  // If the user navigates to a message within the inbox
  if (tab.url.indexOf('#inbox/') > -1) {
	//(re) set the timer
        chrome.pageAction.hide(tabId);
	clearTimeout(alertTimeoutID);
	clearTimeout(warningTimeoutID);
	warningTimeoutID = setTimeout(function () {
		//Show the icon
	        chrome.pageAction.show(tabId);
	}, 90000);
	alertTimeoutID = setTimeout(function () {
		//Popup an alert
		alert('2 minutes up. Move on.');
	}, 120000);
  } else {
	//Clear the timers
        chrome.pageAction.hide(tabId);
	clearTimeout(alertTimeoutID);
	clearTimeout(warningTimeoutID);
  }
	
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
