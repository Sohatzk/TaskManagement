using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Controllers.Base;
using TaskManagement.Models.WorkItem.Out;
using TaskManagement.Service.WorkItems;

namespace TaskManagement.Controllers;

[Authorize]
public class WorkItemController(IWorkItemService workItemService, IMapper mapper) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetWorkItems(CancellationToken cancellationToken)
    {
        var workItemViews = await workItemService.GetWorkItemsAsync(cancellationToken);
        return Ok(mapper.Map<List<WorkItemGridResponse>>(workItemViews));
    }
}