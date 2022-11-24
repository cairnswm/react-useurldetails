# useURLDetails

A react hook to retrieve URL details by usng thew Windows.location api to populate a state variable for easy access to the values.

To minimise security risks only a valid set of parameters will be returned. 

## Installation

```
npm i react-useurldetails
```

## Usage

Call the hook passing in a string array of valid querystring parameters. only these values will be returned in the params property of details. *This is to minimise the risk of prototype pollution by limiting the input values to only those required by the application*

```javascript
function DiplayURLDetails() {
  const expectedQueryStringField = ["id","name"];
  const details = useURLDetails(expectedQueryStringField);

  console.log("URL INFO", details);

  return (
    <div className="App">
      <div>href: {details.href}</div>
      <div>hash: {details.hash}</div>
      <div>
        params:{" "}
        {details.params.map((item) => {
          return (
            <div key={item.key} style={{ marginLeft: "50px" }}>
              {item.key}: {item.value}
            </div>
          );
        })}
      </div>
      <div>hostname: {details.hostname}</div>
      <div>port: {details.port}</div>
      <div>pathname: {details.pathname}</div>
      <div>protocol: {details.protocol}</div>
    </div>
  );
}

## Fields

The following list of fields are available in the returned details object
- href: the full url
- hash: the hash (if any) with search parameters removed. so "#page?id=1" is returned as "page"
- params: an array of key value pairs { key: "id", value: "1" }
- hostname: the hostname of the url
- port: the port used in the url
- pathname: the path portion of the url as a string
- protocol: the protocol used to access the page