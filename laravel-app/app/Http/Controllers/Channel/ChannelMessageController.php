<?php

namespace App\Http\Controllers\Channel;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChannelMessages\UploadAttachmentRequest;
use App\Http\Requests\ChannelMessages\CreateMessageRequest;
use App\Http\Requests\ChannelMessages\UpdateMessageRequest;
use App\Http\Requests\ChannelMessages\ReactToMessageRequest;
use App\Http\Requests\ChannelMessages\RemoveReactionRequest;
use App\Http\Requests\ChannelMessages\ListMessagesRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Services\ChannelMessages\ChannelMessageService;
use App\Http\Responses\BaseApiResponse;

class ChannelMessageController extends Controller
{
    public function __construct(private ChannelMessageService $service) {}

    public function send(CreateMessageRequest $request)
    {
        $message = $this->service->sendMessage($request->validated());

        return BaseApiResponse::success($message, 'Message created', 201);
    }

    public function fetchChannelMessages(ListMessagesRequest $request, string $channelId)
    {
        $perPage  = $request->validated('per_page') ?? 50;
        $messages = $this->service->listMessages($channelId, $perPage);

        return BaseApiResponse::success($this->paginate($messages));
    }

    public function editContent(UpdateMessageRequest $request, string $messageId)
    {
        $message = $this->service->updateMessage($messageId, $request->validated()['content']);

        return BaseApiResponse::success($message, 'Message updated');
    }

    public function remove(string $messageId)
    {
        $this->service->deleteMessage($messageId);

        return BaseApiResponse::success(null, 'Message deleted');
    }

    public function addReaction(ReactToMessageRequest $request, string $messageId)
    {
        $reaction = $this->service->addReaction(
            $messageId,
            $request->validated()['user_id'],
            $request->validated()['reaction']
        );

        return BaseApiResponse::success($reaction, 'Reaction added', 201);
    }

    public function removeReaction(RemoveReactionRequest $request, string $messageId)
    {
        $this->service->removeReaction(
            $messageId,
            $request->validated()['user_id'],
            $request->validated()['reaction']
        );

        return BaseApiResponse::success(null, 'Reaction removed');
    }

    public function attachFile(UploadAttachmentRequest $request, string $messageId)
    {
        $attachment = $this->service->attachFile(
            $messageId,
            $request->validated()['file_url'],
            $request->validated()['file_type']
        );

        return BaseApiResponse::success($attachment, 'Attachment uploaded', 201);
    }

    public function fetchThreadMessages(ListMessagesRequest $request, string $threadId)
    {
        $perPage  = $request->validated('per_page') ?? 50;
        $messages = $this->service->listThreadMessages($threadId, $perPage);

        return BaseApiResponse::success($this->paginate($messages));
    }

    /**
     * Normalize paginator structure.
     */
    private function paginate(LengthAwarePaginator $paginator): array
    {
        return [
            'items' => $paginator->items(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
                'last_page'    => $paginator->lastPage(),
            ],
        ];
    }
}
