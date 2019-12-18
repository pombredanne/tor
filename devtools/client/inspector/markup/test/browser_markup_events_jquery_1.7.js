/* vim: set ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/ */
/* import-globals-from helper_events_test_runner.js */
"use strict";

requestLongerTimeout(2);

// Test that markup view event bubbles show the correct event info for jQuery
// and jQuery Live events (jQuery version 1.7).

const TEST_LIB = "lib_jquery_1.7_min.js";
const TEST_URL = URL_ROOT + "doc_markup_events_jquery.html?" + TEST_LIB;

loadHelperScript("helper_events_test_runner.js");

/*eslint-disable */
const TEST_DATA = [
  {
    selector: "html",
    expected: [
      {
        type: "DOMContentLoaded",
        filename: URL_ROOT + TEST_LIB + ":2",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function() {
            c.removeEventListener("DOMContentLoaded", C, !1), e.ready()
          }`
      },
      {
        type: "load",
        filename: TEST_URL + ":27",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          () => {
            var handler1 = function liveDivDblClick() {
              alert(1);
            };
            var handler2 = function liveDivDragStart() {
              alert(2);
            };
            var handler3 = function liveDivDragLeave() {
              alert(3);
            };
            var handler4 = function liveDivDragEnd() {
              alert(4);
            };
            var handler5 = function liveDivDrop() {
              alert(5);
            };
            var handler6 = function liveDivDragOver() {
              alert(6);
            };
            var handler7 = function divClick1() {
              alert(7);
            };
            var handler8 = function divClick2() {
              alert(8);
            };
            var handler9 = function divKeyDown() {
              alert(9);
            };
            var handler10 = function divDragOut() {
              alert(10);
            };

            if ($("#livediv").live) {
              $("#livediv").live("dblclick", handler1);
              $("#livediv").live("dragstart", handler2);
            }

            if ($("#livediv").delegate) {
              $(document).delegate("#livediv", "dragleave", handler3);
              $(document).delegate("#livediv", "dragend", handler4);
            }

            if ($("#livediv").on) {
              $(document).on("drop", "#livediv", handler5);
              $(document).on("dragover", "#livediv", handler6);
              $(document).on("dragout", "#livediv:xxxxx", handler10);
            }

            var div = $("div")[0];
            $(div).click(handler7);
            $(div).click(handler8);
            $(div).keydown(handler9);
          }`
      },
      {
        type: "load",
        filename: URL_ROOT + TEST_LIB + ":2",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function(a) {
            if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
              if (!c.body) return setTimeout(e.ready, 1);
              e.isReady = !0;
              if (a !== !0 && --e.readyWait > 0) return;
              B.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").unbind("ready")
            }
          }`
      }
    ]
  },
  {
    selector: "#testdiv",
    expected: [
      {
        type: "click",
        filename: TEST_URL + ":34",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divClick1() {
            alert(7);
          }`
      },
      {
        type: "click",
        filename: TEST_URL + ":35",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divClick2() {
            alert(8);
          }`
      },
      {
        type: "keydown",
        filename: TEST_URL + ":36",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divKeyDown() {
            alert(9);
          }`
      }
    ]
  },
  {
    selector: "#livediv",
    expected: [
      {
        type: "dblclick",
        filename: TEST_URL + ":28",
        attributes: [
          "jQuery",
          "Live"
        ],
        handler: `
          function liveDivDblClick() {
            alert(1);
          }`
      },
      {
        type: "dragend",
        filename: TEST_URL + ":31",
        attributes: [
          "jQuery",
          "Live"
        ],
        handler: `
          function liveDivDragEnd() {
            alert(4);
          }`
      },
      {
        type: "dragleave",
        filename: TEST_URL + ":30",
        attributes: [
          "jQuery",
          "Live"
        ],
        handler: `
          function liveDivDragLeave() {
            alert(3);
          }`
      },
      {
        type: "dragover",
        filename: TEST_URL + ":33",
        attributes: [
          "jQuery",
          "Live"
        ],
        handler: `
          function liveDivDragOver() {
            alert(6);
          }`
      },
      {
        type: "dragstart",
        filename: TEST_URL + ":29",
        attributes: [
          "jQuery",
          "Live"
        ],
        handler: `
          function liveDivDragStart() {
            alert(2);
          }`
      },
      {
        type: "drop",
        filename: TEST_URL + ":32",
        attributes: [
          "jQuery",
          "Live"
        ],
        handler: `
          function liveDivDrop() {
            alert(5);
          }`
      }
    ]
  },
];
/* eslint-enable */

add_task(async function() {
  await runEventPopupTests(TEST_URL, TEST_DATA);
});