class GroupsController < ApplicationController
  def new
    # group　新規作成画面
    @group = Group.new
    # Groupクラスのいんスタンス作成　アソシエーション先　user　従属　とuser_group　支配
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: '『ぶっ殺すぶっ殺すと言ってるだけの仲良しクラブを作成しました！』'
    else
      render :new
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, {:user_ids => []})
  end
end
