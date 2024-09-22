using Microsoft.AspNetCore.Mvc;

namespace BTSpeculation.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpeculationController : ControllerBase
    {
        [HttpGet("GetHistorical/{Ticker}")]
        public async Task<IActionResult> GetHistoricalData(string Ticker)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = $"https://api.polygon.io/v1/open-close/{Ticker}/2024-09-20?adjusted=true&apiKey=JSyxXauRdpoHMGjFE0ZBTGKnAoWtoPsz";
                // Send a GET request to the specified URL
                var response = await client.GetAsync(url);


                // Read the response content
                var responseData = await response.Content.ReadAsStringAsync();

                return Ok(responseData);
            }
        }
    }
}
