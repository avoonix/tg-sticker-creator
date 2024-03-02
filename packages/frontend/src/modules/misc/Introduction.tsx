import { Well } from "@react-spectrum/well";
import { FC } from "react";

const Introduction: FC = (props) => {
  return (
    <Well>
      <p style={{padding: "8px", margin: "8px", fontSize: "1.5em", color: "orange", borderLeft: "0.2em solid orange", maxWidth: "50%"}}>

 I no longer have fun working on this project, and I don't see myself supporting it any longer. Importing and exporting to/from JSON should continue to work, but the telegram bot has been disabled.
      </p>
      <p>
        Pick a template that most closely matches your character to get started
        and tweak it to your liking. The sticker type can be changed later.
      </p>
      <p>
        After you're done customizing the template, make sure to save the config
        with either <i>Settings &gt; Export</i> or the{" "}
        <a
          href="https://t.me/AvooStickerStashBot"
          style={{ textDecoration: "underline" }}
        >
          Telegram bot
        </a>
        . If you use the bot, it can also create the sticker set and upload the
        stickers for you.
      </p>
    </Well>
  );
};

export default Introduction;
