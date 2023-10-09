import { useEffect, useState, useRef, useCallback } from 'react';

// Add a function and accept prop loadImmediately which will invoke that function, the function will be exposed to allow manual load

export const useExternalScript = (
  url: string,
  loadInitially = true,
  defer = true,
  customAttributes = {},
) => {
  const [state, setState] = useState(url ? 'loading' : 'idle');

  const setStateFromEvent = (event) => {
    setState(event.type === 'load' ? 'ready' : 'error');
  };
  const setAttributeFromEvent = useCallback(
    (event) => {
      const script = document.querySelector(`script[src="${url}"]`);
      script?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
    },
    [url],
  );
  const loadScript = useCallback(() => {
    if (!url) {
      setState('idle');
      return;
    }

    let script: HTMLScriptElement | null = document.querySelector(`script[src="${url}"]`);

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      script.async = true;
      if (customAttributes) {
        for (let key in customAttributes) {
          script[key] = customAttributes[key];
        }
      }
      if (defer) {
        script.defer = true;
      }

      document.body.appendChild(script);
      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      setState(script.getAttribute('data-status') ?? 'idle');
    }

    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);
  }, [url, defer, customAttributes, setAttributeFromEvent]);
  const unloadScript = useCallback(() => {
    const script = document.querySelector(`script[src="${url}"]`);
    if (script) {
      script.removeEventListener('load', setStateFromEvent);
      script.removeEventListener('error', setStateFromEvent);
      // script.current = null;
      // document.querySelector(`script[src="${url}"]`)?.remove()
    }
  }, []);
  useEffect(() => {
    if (loadInitially) {
      loadScript();
    }
    return () => {
      unloadScript();
    };
  }, [url, loadScript, loadInitially, unloadScript]);

  return {
    state,
    loadScript,
    unloadScript,
  };
};
