/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// import * as functions from "firebase-functions";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const geminiPredict = functions.https.onRequest(
//   async (req, res) => {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(req.body.prompt);
//     res.json({ text: result.response.text() });
//   }
// );

import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { GoogleGenerativeAI } from "@google/generative-ai";

setGlobalOptions({ region: "asia-south1" }); // India ke liye best

export const geminiPredict = onRequest(async (req, res) => {
  try {
    const { people, eventType, pastWastage } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are an AI system helping reduce food waste.

Inputs:
- Expected people: ${people}
- Event type: ${eventType}
- Past wastage level: ${pastWastage}

Give:
1. Suggested food quantity
2. Risk level
3. Sustainability tip
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ success: true, result: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

