import { useState, useEffect } from "react";

interface keyValuePair {
  key: string
  value: string
}

export const loadURLDetails = (valid: string[]) => {
  let hash = window.location.hash;
  hash = hash.split("?")[0].replace("#", "");

  const myURL = new URL(window.location.href);
  if (window.location.hash) {
    myURL.search = window.location.hash.substr(
      window.location.hash.indexOf("?")
    );
  }
  const hrefparams: keyValuePair[] = [];
  myURL.searchParams.forEach((value, key) => {
    if (valid.includes(key)) {
      hrefparams.push({ key, value });
    }
  });

  return {
    href: window.location.href,
    hash: hash,
    params: hrefparams,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    protocol: window.location.protocol,
    set: (url: string) => {},
  };
};

interface URLDetails {
    href: string,
    hash: string,
    params: keyValuePair[],
    hostname: string,
    port: string,
    pathname: string,
    protocol: string,
    set: (url: string) => void
}
const emptyDetails: URLDetails = {
  href: "",
    hash: "",
    params: [],
    hostname: "",
    port: "",
    pathname: "",
    protocol: "",
    set: (url: string) => {}
}
const useURLDetails = (valid: string[]) => {
  const [details, setDetails] = useState<URLDetails>(emptyDetails);
  const [validParams, ] = useState(valid);

  window.addEventListener('popstate', () => {
    setDetails(loadURLDetails(validParams))
  });
  window.addEventListener("locationchange", () => {
    setDetails(loadURLDetails(validParams));
  });

  const set  = (url: string) => {  
      window.history.pushState(null, "", url);
      setDetails(loadURLDetails(validParams)); 
    }

  useEffect(() => {
    setDetails(loadURLDetails(validParams))    
  }, [validParams]);

  return { ...details, set};
}

export default useURLDetails;