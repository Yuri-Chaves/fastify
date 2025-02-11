import z from "zod";
import { authOptions } from "../options";

export type TPostSession = z.infer<typeof authOptions.postSession.schema.body>
