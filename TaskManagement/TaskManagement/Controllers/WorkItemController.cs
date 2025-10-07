using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Controllers.Base;
using TaskManagement.Models.WorkItem.In;
using TaskManagement.Models.WorkItem.Out;
using TaskManagement.Service.WorkItems;
using TaskManagement.Service.WorkItems.Descriptors;

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
    
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetWorkItemById(Guid id, CancellationToken cancellationToken)
    {
        var workItemView = await workItemService.GetWorkItemByIdAsync(id, cancellationToken);
        if (workItemView is null)
        {
            return NotFound();
        }
        
        return Ok(mapper.Map<WorkItemResponse>(workItemView));
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateWorkItem(WorkItemCreateModel model, CancellationToken cancellationToken)
    {
        var descriptor = mapper.Map<WorkItemCreateDescriptor>(model);
        return Ok(await workItemService.CreateWorkItemAsync(descriptor, cancellationToken));
    }
    
    [HttpPut]
    public async Task<IActionResult> UpdateWorkItem(WorkItemUpdateModel model, CancellationToken cancellationToken)
    {
        var descriptor = mapper.Map<WorkItemUpdateDescriptor>(model);
        await workItemService.UpdateWorkItemAsync(descriptor, cancellationToken);
        return Ok();
    }
    
    [HttpDelete]
    public async Task<IActionResult> DeleteWorkItems(Guid[] ids, CancellationToken cancellationToken) 
    {
        await workItemService.DeleteWorkItemsAsync(ids, cancellationToken);
        return Ok();
    }
}