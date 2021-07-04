import qs from "qs";

//문자열배열과 location을 인자로 주면 현재 주소에서 해당하는 쿼리로 재조립해주는 함수
const getQueryString = (keywords, location, isPrefix = true) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  var result = "";

  for (var i = 0; i < keywords.length; i++) {
    const key = query[keywords[i]];
    if (key) {
      result += `${result == "" && isPrefix ? "?" : "&"}${keywords[i]}=${key}`;
    }
  }
  return result;
};

export default getQueryString;
