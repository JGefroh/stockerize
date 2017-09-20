(function() {
  angular
    .module('jgefroh.components')
    .factory('BaseServiceFactory', ['$http', 'config', Factory]);

  function Factory($http, config) {
    function createBaseService(resourceNameSingular, resourceNamePlural) {
      var service = {};
      service.resourceNameSingular = resourceNameSingular;
      service.resourceNamePlural = resourceNamePlural;
      service.$http = $http;
      service.cache = {};

      service.cache = function(key, value, justOnce) {
        if (key && (value === undefined)) {
          var cachedValue = service.cache[key];
          if (cachedValue && cachedValue.justOnce) {
            service.cache[key] = undefined;
          }
          return cachedValue || {};
        }
        else {
          service.cache[key] = {
            key: key,
            value: value,
            justOnce: justOnce
          };
        }
      };


      service.getBaseUrl = function() {
        return config.webServiceBase + '/' + service.resourceNamePlural;
      };

      service.collectionsUrl = function() {
        return service.getBaseUrl();
      };

      service.memberUrl = function(id) {
        return service.getBaseUrl() + (id ? '/' + encodeURIComponent(id) : '');
      };

      service.getResponsePayload = function(response) {
        return response.data[service.resourceNameSingular] || response.data[service.resourceNamePlural] || response.data;
      };

      service.getResponseData = function(response) {
        return response.data;
      }

      service.createPayload = function(resource) {
        var payload = {};
        payload[service.resourceNameSingular] = resource;
        return payload;
      };

      service.query = function(params) {
        return $http.get(service.collectionsUrl(), {params: params}).then(service.getResponsePayload);
      };
      service.get = function(id) {
        return $http.get(service.memberUrl(id)).then(service.getResponsePayload);
      };
      service.save = function(resource, params) {
        return $http.post(service.memberUrl(), service.createPayload(resource), {params: params}).then(service.getResponsePayload);
      };
      service.update = function(resource, params) {
        return $http.put(service.memberUrl(resource.id), service.createPayload(resource), {params: params}).then(service.getResponsePayload);
      };
      service.delete = function(resource, params) {
        return $http.delete(service.memberUrl(resource.id), {params: params}).then(service.getResponsePayload);
      };

      return service;
    }
    return createBaseService;
  }
})();
