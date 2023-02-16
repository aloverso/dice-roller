import { ReactElement } from "react";
import Link from "next/link";

export const About = (): ReactElement => {
  return (
    <div className="container">
      <div className="row mts">
        <Link className="pull-right phs" href="/">
          home
        </Link>
        <Link className="pull-right phs" href="/history">
          roll history
        </Link>
      </div>
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <h1 className="text-xl">about</h1>

          <h2 className="text-l mtm">who built this?</h2>
          <p>
            <a href="http://anneloverso.com/">Anne LoVerso</a>
            <a href="https://twitter.com/AnneLoVerso">
              <picture>
                <img alt="twitter" className="twitter" src={"/assets/twitter.svg"} />
              </picture>
            </a>
          </p>

          <h2 className="text-l mtm">why?</h2>
          <p>
            For fun, and because I wanted to build some super-simple web application so that I would
            have an excuse to put together a barebones version of code that can drive a super-simple
            React/Node app powered by API and database integrations.
          </p>

          <h2 className="text-l mtm">how do I add my +3 to hit?</h2>
          <p>
            That&apos;s the neat thing - you don&apos;t! Good, clean tools are opinionated to
            prevent bloat. This tool is of the opinion that adding modifiers to dice rolls heavily
            clutters to the interface without any discernible value - especially given how the
            modifier changes for nearly every roll. You&apos;ll just have to add those +3s in your
            head, my friend.
          </p>

          <h2 className="text-l mtm">why is it so slow to generate a random dice roll?</h2>
          <p>
            A roll takes about 750ms to load because instead of generating JavaScript pseudo-random
            numbers, we&apos;re actually using the <a href="https://www.random.org/">random.org</a>{" "}
            API to generate rolls.
          </p>

          <h2 className="text-l mtm">can I contribute?</h2>
          <p>
            Sure thing, here&apos;s the <a href="https://github.com/aloverso/dice-roller">GitHub</a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
