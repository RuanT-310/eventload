import { app } from "./src/app.js";
import { secrets } from "./src/config/secrets.js";

const PORT = secrets.port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
