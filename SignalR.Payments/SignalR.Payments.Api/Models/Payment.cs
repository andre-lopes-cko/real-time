using System;
using System.Text.Json.Serialization;
using SignalR.Payments.Api.Models;

namespace SignalR.Payments.Api.Models
{
    public class Payment
    {
        public Guid Id { get; set; }

        public string Merchant { get; set; }

        public decimal Amount { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PaymentStatus Status { get; set; }
    }
}
