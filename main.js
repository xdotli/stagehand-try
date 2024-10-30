import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";

const stagehand = new Stagehand({
  env: "LOCAL",
});

await stagehand.init();
await stagehand.page.goto("https://www.bloomberg.com/markets/economic-calendar");
await stagehand.act({ action: "get all economic event data rows" });
const contributor = await stagehand.extract({
  instruction: "extract datapoints",
  schema: z.object({
    time: z.string(),
    currency: z.string(),
    importance: z.string(),
    event: z.string(),
    actual: z.string(),
    forecast: z.string(),
    previous: z.string(),
  }),
});
console.log(`economic data points is ${contributor.username}`);