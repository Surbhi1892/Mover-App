package az.mover.mobile.android;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinnerFactory implements OkHttpClientFactory {
    private static String hostname = "mover.az";

    public OkHttpClient createNewNetworkModuleClient() {
        CertificatePinner certificatePinner = new CertificatePinner.Builder()
                .add(hostname, "sha256/vjYLM8vjcC8RJwdiPZPNjE4qtsyguEDRARYHrtCQN7I=")
                .build();
        // Get a OkHttpClient builder with all the React Native defaults
        OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
        return clientBuilder
                .certificatePinner(certificatePinner)
                .build();
    }
}
