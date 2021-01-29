using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Payments.Api.Hubs;
using SignalR.Payments.Api.Hubs.Clients;
using SignalR.Payments.Api.Models;

namespace SignalR.Payments.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IHubContext<PaymentsHub, IPaymentsClient> _hub;

        public PaymentsController(IHubContext<PaymentsHub, IPaymentsClient> hub)
        {
            _hub = hub;
        }

        private static readonly List<Payment> Payments = new List<Payment>
        {
            new Payment{
                Id = Guid.NewGuid(),
                Merchant = "Nintendo",
                Amount = 69.99m,
                Status = PaymentStatus.Succeeded
            }
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Payments);
        }

        [HttpPost]
        public async Task<IActionResult> OnboardAsync(CreatePayment createPayment)
        {
            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                Merchant = createPayment.Merchant,
                Amount = decimal.Round(createPayment.Amount, 2),
                Status = PaymentStatus.Pending
            };

            Payments.Add(payment);

            await _hub.Clients.All.UpdatePayments(Payments);

            return Created(payment.Id.ToString(), payment);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> OffboardAsync(Guid id, [FromQuery] PaymentStatus status)
        {
            var business = Payments.SingleOrDefault(b => b.Id == id);
            business.Status = status;

            await _hub.Clients.All.UpdatePayments(Payments);

            return Ok();
        }
    }

    public class CreatePayment
    {
        public string Merchant { get; set; }

        public decimal Amount { get; set; }
    }
}
