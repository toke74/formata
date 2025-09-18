import connectDB from "../config/db.js";
import Template from "../models/Template.model.js";

async function seed() {
  await connectDB();
  const templates = [
    {
      name: "Classic Print",
      description: "Serif heading, drop-caps",
      configuration: {},
    },
    {
      name: "Modern Serif",
      description: "Modern book layout",
      configuration: {},
    },
  ];
  for (const t of templates) {
    await Template.create(t);
  }
  console.log("Templates seeded");
  process.exit(0);
}

seed().catch((e) => console.error(e));
