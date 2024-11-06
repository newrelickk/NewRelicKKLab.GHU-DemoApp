using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace NewRelicKKLab.GHU_DemoApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet([FromQuery]bool error = false)
        {
            if (error)
                throw new Exception("This is an exception message");
            _logger.LogInformation("This is an information log message");
        }
    }
}
