using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace NewRelicKKLab.GHU_DemoApp.Pages
{
    public class IndexModel : PageModel
    {
        public string? Secret { get; set; }
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet([FromQuery] bool error = false)
        {
            if (error)
                throw new Exception("This is an exception message");
            _logger.LogInformation("This is an information log message");

            var options = new SecretClientOptions()
            {
                Retry =
                    {
                        Delay= TimeSpan.FromSeconds(2),
                        MaxDelay = TimeSpan.FromSeconds(16),
                        MaxRetries = 5,
                        Mode = RetryMode.Exponential
                     }
            };
            var client = new SecretClient(new Uri("https://MyVault733.vault.azure.net/"), new DefaultAzureCredential(), options);

            var secret = client.GetSecret("Key1");

            var secretValue = secret.Value;
            Secret = secretValue.Value;
            _logger.LogInformation("Secret= {Secret}", Secret);
        }
    }
}
