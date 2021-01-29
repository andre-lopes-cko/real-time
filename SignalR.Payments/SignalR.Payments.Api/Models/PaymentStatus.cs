using System.Text.Json.Serialization;

namespace SignalR.Payments.Api.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PaymentStatus
    {
        Pending = 1,
        Succeeded,
        Failed,
    }
}