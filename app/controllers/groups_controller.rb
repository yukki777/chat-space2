class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def new
    # group　新規作成画面
    @group = Group.new
    # Groupクラスのいんスタンス作成　アソシエーション先　user　従属　とuser_group　支配
    @group.users << current_user
    # binding.pry
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: '『ぶっ殺すぶっ殺す』と言ってるだけの仲良しクラブを作成しました！'
      # flashメッセージ
    else
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
