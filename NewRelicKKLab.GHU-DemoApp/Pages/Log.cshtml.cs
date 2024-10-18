using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace NewRelicKKLab.GHU_DemoApp.Pages
{
    public class LogModel : PageModel
    {

        private readonly ILogger<IndexModel> _logger;

        public LogModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            // Log a message to the console
            System.Console.WriteLine("This is a console log message");
            // Log a message to the output window
            System.Diagnostics.Debug.WriteLine("This is a debug output message");
            _logger.LogInformation("This is an information log message");
        }
    }
}
