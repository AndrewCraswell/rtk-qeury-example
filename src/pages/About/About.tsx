import { Title3, Subtitle2, Body1, Link } from "@fluentui/react-components";

export function About() {
  return (
    <>
      <Subtitle2>About the demo</Subtitle2>
      <div>
        <Body1 block style={{ maxWidth: 750 }}>
          This app demos the difference between fetching data within components
          compared to using a{" "}
          <Link
            href="https://redux-toolkit.js.org/rtk-query/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit Query
          </Link>{" "}
          as a request layer to abstract network fetching, status tracking,
          error handling, and caching outside of components. This way, hooks can
          be leveraged within each component that needs to fetch data.
        </Body1>
      </div>
    </>
  );
}
