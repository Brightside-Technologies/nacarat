import HttpInterceptor from "./http-interceptor.config";

export default function HttpConfig($httpProvider) {
    $httpProvider.interceptors.push(HttpInterceptor);
}
